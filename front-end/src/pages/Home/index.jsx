import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

const Home = () => {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  const getUsers = async () => {
    const usersApi = await api.get('/usuarios')
    setUsers(usersApi.data)
  }

  const clear = () => {
    inputName.current.value = ""
    inputAge.current.value = ""
    inputEmail.current.value = ""
  }

  const createUsers = async () => {
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      alert("Usuário cadastrado com sucesso")
      getUsers()
    } catch {
      alert("Falha ao conectar no servidor")
    } finally {
      clear()
    }

  }

  const deleteUsers = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`)
      alert("Usuario deletado")
      getUsers()
    } catch {
      alert("Falha ao deletar usuario")
    }
  }

  useEffect(() => {
    getUsers()
  },)

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='Nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='Idade' type='number' ref={inputAge} />
        <input placeholder='Email' name='Email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>


      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>


      ))}


    </div>
  )
}
export default Home
