import React from 'react'
import dayjs from "dayjs"



const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;


    return (
        <div>

        </div>
    )
}

export default InterviewCard
