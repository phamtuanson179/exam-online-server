import mongoose from "mongoose";

const TeacherOfClassroomSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        classroomId: { type: String, required: true },
    },
    { timestamps: true }
);

export const TeacherOfClassroom = mongoose.model("TeacherOfClassroom", TeacherOfClassroomSchema);