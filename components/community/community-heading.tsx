import React from 'react'

interface CommunityHeadingProps {
    heading: string
}
export const CommunityHeading: React.FC<CommunityHeadingProps> = ({ heading }) => {
  return (
    <h1 className="text-xl font-medium">{heading}</h1>
  )
}
