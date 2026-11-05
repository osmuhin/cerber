export const useTypingDetector = (onTyping: () => void) => {
	const onKeyDown = (e: KeyboardEvent) => {
		// Если нажата клавиша-модификация
		if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
			return
		}

		// Если клавиша non-printable
		if (e.key.length !== 1) {
			return
		}

		// Если в фокусе какое-то поле ввода
		if (
			window.document.activeElement?.tagName.toLowerCase() === 'input' ||
			window.document.activeElement?.tagName.toLowerCase() === 'textarea'
		) {
			return
		}

		onTyping()
	}

	window.addEventListener('keydown', onKeyDown)

	return () => window.removeEventListener('keydown', onKeyDown)
}
