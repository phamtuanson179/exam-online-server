import mongoose from "mongoose";

const StudentOfClassroomSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        classroomId: { type: String, required: true },
    },
    { timestamps: true }
);

export const StudentOfClassroom = mongoose.model("StudentOfClassroom", StudentOfClassroomSchema);