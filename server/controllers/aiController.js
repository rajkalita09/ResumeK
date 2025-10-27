import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// controller for enhancing resume's professional summary using AI
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message: "Content is required"});
        }
        
     const response = await ai.chat.completions.create({
                    model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-3 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// controller for enhancing resume's job description using AI
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent} = req.body;

        if(!userContent){
            return res.status(400).json({message: "Content is required"});
        }
        
     const response = await ai.chat.completions.create({
                    model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", 
                content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences per job role, focusing on achievements, responsibilities, and skills demonstrated. Use action verbs and quantify results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// controller for uploading a resume to database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: "Resume text is required"});
        }
        
        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        
        const userPrompt = `extract data from this resume: ${resumeText} provide the data in the following JSON format with no additional text before or after:
        {
        professional_summary: { type: String, default: '' },
        skills: [{ type: String}],
        personal_info: {
            full_name: { type: String, default: '' },
            profession: { type: String, default: '' },
            email: { type: String, default: '' },
            phone: { type: String, default: '' },
            location: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            website: { type: String, default: '' },
            image: { type: String, default: '' },
        },
        experience: [{
            company: { type: String},
            position: { type: String},
            start_date: { type: String},
            end_date: { type: String},
            description: { type: String},
            is_current: { type: Boolean },
        }
        ],

        project: [{
            name: { type: String},
            type: { type: String},
            link: { type: String},
            description: { type: String},
        }
        ],
        education: [{
            institution: { type: String},
            degree: { type: String},
            field: { type: String},
            graduation_date: { type: String},
            gpa: { type: String},
        }
    ],
    }`;

     const response = await ai.chat.completions.create({
                    model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", 
                content: systemPrompt },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],

            response_format: {type: "json_object"}
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({userId, title, ...parsedData});
        res.json({resumeId: newResume._id, message: "Resume uploaded successfully"});
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
}