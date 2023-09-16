import { ChangeEvent, FormEvent, useState } from "react"
import { postLogin } from "../services/user-service"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type ValuesProps = {
  email: string
  password: string
}

export default function Login () {
  const navigate = useNavigate()
  const [values, setValues] = useState<ValuesProps>({
    email: '',
    password: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setValues({
      ...values,
      [name]: value
    })

  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // LOGUEI COM MEU USUARIO
      const result = await postLogin(values)

      // GUARDEI OS DADOS NO LOCALSTORAGE COM O NOME DA CHAVE TOKEN
      localStorage.setItem('TOKEN', result.token)

      navigate('/', { replace: true })
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  return (
    <>
      <h1>Login</h1>

      <pre>{JSON.stringify(values, null, 2)}</pre>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="email" placeholder="Digite seu email" onChange={handleChange} />
        </div>
        <div>
          <input type="password" name="password" placeholder="Digite sua senha" onChange={handleChange} />
        </div>
        <button type="submit">Entrar</button>
      </form>

    </>
  )
}