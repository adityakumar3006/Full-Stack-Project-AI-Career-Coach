"use server";

import { industries } from "@/data/industries";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";
// api endpoint to update user information
export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,

        },
    })
    if (!user) {
        throw new Error("User not found");
    }
    try {

        const result = await db.$transaction(async (tx) => {

            //find the industry existing in the database

            let industryInsight = await tx.industryInsight.findUnique({
                where: {
                    industry: data.industry
                }
            })
            // if industry is not found, create it with default values-- willl replace with ai later


            if (!industryInsight) {
                const insights = await generateAIInsights(data.industry);

                industryInsight = await db.industryInsight.create({
                    data:
                    {
                        industry: data.industry,
                        ...insights,
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                })

            }
            // update the user 

            const updatedUser = await tx.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills,
                    industry: data.industry,

                },
            });
            return { updatedUser, industryInsight }

        }, {
            timeout: 10000
        });


        return { success: true, ...result }
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}


export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },

    });

    if (!user) {
        throw new Error("User not found");
    }
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true
            }

        });
        return {
            isOnboarded: !!user?.industry
        }
    }
    catch (error) {
        console.error("Error fetching user onboarding status:", error.message);
        throw new Error("Failed to fetch user onboarding status");
    }

}