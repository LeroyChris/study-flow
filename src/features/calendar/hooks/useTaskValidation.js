import useCurrentDateTime from './useCurrentDateTime'

export default function useTaskValidation() {
  const { todayStr, currentTimeStr } = useCurrentDateTime()

  const validateTask = (selectedDate, selectedTime) => {
    // Validasi 1: Jika tanggal yang dipilih lebih lampau dari hari ini
    if (selectedDate < todayStr) {
      return { isValid: false, message: 'Tidak bisa memilih tanggal yang sudah lewat!' }
    }

    // Validasi 2: Jika tanggalnya hari ini, tapi jamnya sudah lewat
    if (selectedDate === todayStr && selectedTime < currentTimeStr) {
      return { isValid: false, message: 'Tidak bisa memilih waktu yang sudah lewat!' }
    }

    return { isValid: true, message: '' }
  }

  return { validateTask }
}
