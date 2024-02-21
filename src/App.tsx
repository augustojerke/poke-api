import { Input } from "./components/ui/input"

function App() {
  return (
    <main className="bg-slate-950">
      <div className="flex justify-start align-items p-10">
        <Input className="w-80 text-white bg-slate-900 border-slate-800" placeholder="Nome do Pokemon"/>
      </div>
    </main>
  ) 
}

export default App
