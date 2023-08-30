import { toast } from 'react-hot-toast'
import { ToastOptions } from 'react-hot-toast/headless';



type checkStatusTypeReturn = 'success' | 'redirect' | 'error' | 'serverError'


const checkStatusType = (status: number): checkStatusTypeReturn => {
    const statusSuccess = [200, 299]
    const statusRedirect = [300, 399]
    const statusError = [400, 499]
    const statusServerError = [500, 599]
    const rangeStatusSuccess = getRangeStatus(statusSuccess)
    const rangeStatusRedirect = getRangeStatus(statusRedirect)
    const rangeStatusError = getRangeStatus(statusError)
    const rangeStatusServerError = getRangeStatus(statusServerError)

    if (rangeStatusSuccess.includes(status)) return 'success'
    else if (rangeStatusRedirect.includes(status)) return 'redirect'
    else if (rangeStatusError.includes(status)) return 'error'
    else if (rangeStatusServerError.includes(status)) return 'serverError'
    else return 'serverError'
}


const getRangeStatus = (statusRange: Array<number>): Array<number> => {
    if (statusRange.length > 2) throw new Error('invalid statusRange Array limit')
    let data: Array<number> = []
    for (let i = statusRange[0]; i <= statusRange[1]; i++) {
        data.push(i)
    }
    return data
}
export const ToastPicker = (statusCode: number, message?: string, options?: ToastOptions) => {
    const type = checkStatusType(statusCode)
    if (type === 'success') toast.success(message ?? "", options)
    else if (type === 'redirect') toast('Redirect!', { icon: '🛴', });
    else if (type === 'error') toast.error(message ?? "", options)
    else if (type === 'serverError') toast("Internal Server Error", { icon: '🧯' })
}