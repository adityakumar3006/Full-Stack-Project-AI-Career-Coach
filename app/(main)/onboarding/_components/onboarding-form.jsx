"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { onboardingSchema } from "@/app/lib/schema"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useFetch from "@/hooks/use-fetch"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
const OnboardingForm = ({ industries }) => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const router = useRouter()

    const {
        loading: updateLoading,
        fn: updateUserFn,
        data: updateResult
    } = useFetch(updateUser)

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(onboardingSchema),
    });
    const onSubmit = async (values) => {
        try {
            const formattedIndustry = `${values.industry}-${values.subIndustry
                .toLowerCase()
                .replace(/ /g, "-")
                }`;
            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            });
        }
        catch (error) {
        }

    };

    // it will only run when the updateResult changes and updateresult changes

    useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success("Profile updated successfully");
            router.push("/dashboard");
            router.refresh();
        }

    }, [updateResult, updateLoading])

    const watchIndustry = watch("industry");


    return (
        <div className="flex items-center justify-center bg-background ">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader>
                    <CardTitle className="gradient-title text-4xl">Complete your profile</CardTitle>
                    <CardDescription>
                        Select your industry to get personalized career insights and recommendations

                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-3">
                            <Label htmlFor="industry">Industry</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("industry", value);
                                    setSelectedIndustry(industries.find((industry) => industry.id === value));

                                    setValue("subIndustry", "");
                                }}>


                                <SelectTrigger id="industry">
                                    <SelectValue placeholder="Select an industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industries.map((industry) => {
                                        return <SelectItem key={industry.id} value={industry.id}>
                                            {industry.name}
                                        </SelectItem>
                                    }
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.industry && (
                                <p className="text-sm text-red-500">
                                    {errors.industry.message}
                                </p>
                            )}

                        </div>
                        {watchIndustry && (
                            <div className="space-y-3">
                                <Label htmlFor="subIndustry">Specialization</Label>
                                <Select
                                    onValueChange={(value) =>

                                        setValue("subIndustry", value)
                                    }>


                                    <SelectTrigger id="subIndustry">
                                        <SelectValue placeholder="Select an industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedIndustry?.subIndustries.map((industry) => {
                                            return (<SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                            )
                                        }
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.subIndustry && (
                                    <p className="text-sm text-red-500">
                                        {errors.subIndustry.message}
                                    </p>
                                )}

                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="experience">Years of experience</Label>
                            <Input id="experience"
                                type="number"
                                min="0"
                                max="50"
                                placeholder="Enter your years of experience"
                                {...register("experience")}


                            />
                            {errors.experience && (
                                <p className="text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}

                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="skills">Skills</Label>
                            <Input id="skills"

                                placeholder="eg:, Python, Javascript, Project management"
                                {...register("skills")}


                            />
                            <p className="text-sm text-muted-foreground">
                                Separte multiple skills with commas
                            </p>
                            {errors.skills && (
                                <p className="text-sm text-red-500">
                                    {errors.skills.message}
                                </p>
                            )}

                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="bio">Professional Bio</Label>
                            <Textarea id="Bio"

                                placeholder="Tell us about your profressional background and career goals."
                                className="h-34"
                                {...register("bio")}


                            />

                            {errors.bio && (
                                <p className="text-sm text-red-500">
                                    {errors.bio.message}
                                </p>
                            )}
                            <Button type="submit" className="w-full" disbled={updateLoading}>
                                {updateLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving....
                                    </>
                                ) : (
                                    "Complete Profile"

                                )}
                            </Button>

                        </div>


                    </form>
                </CardContent>

            </Card>
        </div >
    )
}

export default OnboardingForm
