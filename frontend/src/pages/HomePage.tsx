import NotesList from "../components/notes/NotesList";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">
        Notes App
      </h1>

      <NotesList />
    </div>
  );
};

export default HomePage;