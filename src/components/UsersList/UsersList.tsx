import { type User } from '../../types'
import { useState, useEffect } from 'react'
import { Spinner } from '../Spinner/Spinner'

const UsersList = () => {
  const [users, setUsers] = useState<User[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('https://randomuser.me/api?results=10&seed=datata')
      .then(async response => await response.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(error => { console.log(error) })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const copyEmail = (data: string) => {
    navigator.clipboard.writeText(data)
      .then(() => {})
      .catch((error) => { console.log(error) })
  }

  return (
    <div>
      <div className="flex flex-col m-5">
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
                  { isLoading && <><td colSpan={4} className="whitespace-nowrap px-6 py-2"><Spinner /></td></>}
                  {!isLoading && users?.map((user, index) => {
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList
