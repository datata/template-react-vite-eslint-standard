import { type User } from '../../types'
import { useState, useEffect } from 'react'
import { Spinner } from '../Spinner/Spinner'

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)

    fetch(`https://randomuser.me/api?page=${page}&results=10&seed=datata`)
      .then(async response => await response.json())
      .then(res => {
        setUsers(users.concat(res.results))
      })
      .catch(error => { console.log(error) })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page])

  const copyEmail = (data: string) => {
    navigator.clipboard.writeText(data)
      .then(() => {})
      .catch((error) => { console.log(error) })
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <div className="flex flex-col items-center m-5">
      <div className="min-w-full min-h-full py-2 sm:px-6 lg:px-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead
                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className=" px-6 py-4">#</th>
                  <th scope="col" className=" px-6 py-4">First</th>
                  <th scope="col" className=" px-6 py-4">Email</th>
                  <th scope="col" className=" px-6 py-4">Phone number</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 && users?.map((user, index) => {
                  return (
                    <tr key={user.email} className={index % 2 === 0 ? 'border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700' : 'border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'}>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap  px-6 py-4">{user.name.first}</td>
                      <td
                        className="whitespace-nowrap  px-6 py-4 cursor-pointer"
                        onClick={() => { copyEmail(user.email) }}
                      >{user.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">´{user.phone}</td>
                    </tr>
                  )
                })}
                { isLoading && <>
                  <tr>
                    <td colSpan={4} className="whitespace-nowrap px-6 py-2"><Spinner /></td>
                  </tr>
                </>

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex justify-center rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={() => { nextPage() }}
      >
        Next Users
      </button>
    </div>
  )
}

export default UsersList
