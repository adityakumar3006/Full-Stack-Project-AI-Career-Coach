import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Industry is required",
    }),
    subIndustry: z.string({
        required_error: "Specialization is required",
    }),
    bio: z.string().max(500).optional(),

    experience: z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(
            z.number()
                .min(0, "Exxperience must be at least 0 years")
                .max(50, "Experience cannot exceed 50 years")

        ),

    skills: z.string().transform((val) =>
        val
            ? val.split(",").map((skill) => skill.trim()).filter(Boolean) : undefined
    )
});
