
import ApplicationForm from './components/ApplicationForm';

const Home = () => {
    return (
        <div>
            <main className="flex flex-col items-center justify-center min-h-screen p-4">
                <ApplicationForm />
            </main>

            <footer className="flex justify-center p-4 bg-gray-800 text-white">
                <p>&copy; {new Date().getFullYear()} Intern application</p>
            </footer>
        </div>
    );
};

export default Home;
