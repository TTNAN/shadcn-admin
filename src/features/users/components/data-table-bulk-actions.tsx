import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type User } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? '正在激活…' : '正在停用…'} users...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? '已激活' : '已停用'} ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} users`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: '正在邀请用户…',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: '邀请用户失败',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='user'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='邀请所选用户'
              title='邀请所选用户'
            >
              <Mail />
              <span className='sr-only'>邀请所选用户</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>邀请所选用户</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='激活所选用户'
              title='激活所选用户'
            >
              <UserCheck />
              <span className='sr-only'>激活所选用户</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>激活所选用户</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='停用所选用户'
              title='停用所选用户'
            >
              <UserX />
              <span className='sr-only'>停用所选用户</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>停用所选用户</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='删除所选用户'
              title='删除所选用户'
            >
              <Trash2 />
              <span className='sr-only'>删除所选用户</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>删除所选用户</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
