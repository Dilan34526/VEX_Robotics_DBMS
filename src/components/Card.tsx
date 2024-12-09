import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">{children}</div>;
};