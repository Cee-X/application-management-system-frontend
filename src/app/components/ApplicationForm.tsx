'use client';
import { useState } from 'react';

const ApplicationForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        if (resume) {
            formData.append('resume', resume);
        }
        try {
            setUploading(true);
            const response = await fetch('http://localhost:3000/api/submit', {
                method: 'POST',
                body: formData,
            });
            setUploading(false);
            const result = await response.json();
            setFileUrl(result.applicant.resume);
            if (response.ok) {
                setMessage('Application submitted successfully!');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div>
            {message && fileUrl ? (
                <>
                <div className='bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4'>
                    {message}
                </div>
                <a
                    href={fileUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 '
                >
                    Check resume
                </a>
                </>

            ) :             
            <form onSubmit={handleSubmit} className='space-y-2'>
                <h1 className="text-2xl font-bold mb-4">Fill information</h1>
                <div>
                    <label 
                    htmlFor="name" 
                    className='mb-2 block text-sm font-medium'
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                    />
                </div>
                <div>
                    <label 
                    htmlFor="email"  
                    className='mb-2 block text-sm font-medium'
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                    />
                </div>
                <div>
                    <label 
                    htmlFor="phone"  
                    className='mb-2 block text-sm font-medium'>
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                    />
                </div>
                <div>
                    <label 
                    htmlFor="resume"  
                    className='mb-2 block text-sm font-medium'
                    >
                        Resume
                    </label>
                    <input
                        type="file"
                        id="resume"
                        
                        onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                        required
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500'
                    />
                </div>
                <button 
                type="submit" 
                disabled={uploading}
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 w-full'
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        }
        </div>
    );
};
export default ApplicationForm;