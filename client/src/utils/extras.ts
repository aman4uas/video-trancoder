function formatDate(date: Date) {
  const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th']

  function getOrdinal(day: number) {
    if (day % 100 >= 11 && day % 100 <= 13) {
      return day + 'th'
    } else {
      return day + suffixes[day % 10]
    }
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const period = hours >= 12 ? 'PM' : 'AM'

  if (hours === 0) {
    hours = 12
  } else if (hours > 12) {
    hours -= 12
  }
  const formattedDate = `${getOrdinal(day)} ${month}, ${year} at ${hours}:${minutes}${period}`
  return formattedDate
}

function formatFileSize(fileSizeBytes: number): string {
  const bytesInGB = 1024 * 1024 * 1024
  const bytesInMB = 1024 * 1024

  if (fileSizeBytes >= bytesInGB) {
    const fileSizeGB = fileSizeBytes / bytesInGB
    return `${fileSizeGB.toFixed(2)} GB`
  } else {
    const fileSizeMB = fileSizeBytes / bytesInMB
    return `${fileSizeMB.toFixed(2)} MB`
  }
}

export { formatDate, formatFileSize }
