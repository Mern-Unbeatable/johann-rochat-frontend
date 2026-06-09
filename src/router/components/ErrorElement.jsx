import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorElement = () => {
    const error = useRouteError();

    // Optional: structure differs between thrown responses and exceptions
    const status = error?.status || (error?.statusCode || 500);
    const message = error?.statusText || error?.message || 'Something went wrong';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafb] p-6">
            <div className="max-w-xl w-full rounded-md border bg-white p-8 text-center shadow">
                <h1 className="mb-4 text-3xl font-semibold">Unexpected Application Error!</h1>
                <p className="mb-6 text-lg">{status} {message}</p>
                <div className="space-x-3">
                    <Link to="/" className="inline-block rounded-md bg-[#2f66ff] px-4 py-2 text-white">Go home</Link>
                    <button type="button" onClick={() => window.location.reload()} className="inline-block rounded-md border px-4 py-2">Reload</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorElement;
