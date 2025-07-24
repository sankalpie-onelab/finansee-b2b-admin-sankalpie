import { useState, useRef } from 'react'
import { useGetUsersQuery, useChangeUserStatusMutation, useChangeUserPasswordMutation } from '../store/api'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'

interface User {
  name: string
  email: string
  role: string
  status: string
}

function Dashboard() {
  const { data: usersList, isLoading } = useGetUsersQuery({})
  const [changeUserStatus] = useChangeUserStatusMutation()
  const [changeUserPassword] = useChangeUserPasswordMutation()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null)
  const [selectedUserStatus, setSelectedUserStatus] = useState<string | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [error, setError] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const columnHelper = createColumnHelper<User>()


  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs ${info.getValue().toLowerCase() === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
          }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentEmail = info.row.original.email;
              setSelectedUser(selectedUser === currentEmail ? null : currentEmail);
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {selectedUser === info.row.original.email && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStatusModal(true);
                    setSelectedUser(null);
                    setSelectedUserStatus(info.row.original.status);
                    setSelectedUserEmail(info.row.original.email)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Status
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPasswordModal(true);
                    setSelectedUser(null);
                    setSelectedUserEmail(info.row.original.email)
                    setSelectedUserEmail(info.row.original.email)

                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: usersList?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleStatusChange = async () => {
    if (!selectedUserEmail || !newStatus) {
      setError('Please select a status')
      return
    }

    try {
      await changeUserStatus({
        email: selectedUserEmail,
        status: newStatus
      }).unwrap()
      setShowStatusModal(false)
      setNewStatus('')
      setSelectedUserEmail("")
      setSelectedUserStatus("")
      setError('')
    } catch (err) {
      setError('Failed to change status. Please try again.')
      console.error('Error changing status:', err)
    }
  }

  const handlePasswordChange = async () => {
    if (!selectedUserEmail || !newPassword) {
      setError('Please enter a new password')
      return
    }

    try {
      await changeUserPassword({
        email: selectedUserEmail,
        password: newPassword
      }).unwrap()
      setShowPasswordModal(false)
      setNewPassword('')
      setError('')
      setSelectedUserEmail("")
    } catch (err) {
      setError('Failed to change password. Please try again.')
      console.error('Error changing password:', err)
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Change Status</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Select Status</option>
              {
                ["Active","Inactive"].map((val,idx)=>{
                  return selectedUserStatus !== val && <option key={idx} value={val}>{val}</option>
                })
              }
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowStatusModal(false)
                  setError('')
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-[#00B2B2] text-white rounded-md hover:bg-[#009999]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setError('')
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-[#00B2B2] text-white rounded-md hover:bg-[#009999]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard