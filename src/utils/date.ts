import useGlobalStore from "../stores/globalStore";

const useFormatDate = () => {
    const { currentLang } = useGlobalStore();
    return (value: string) => {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        };
        const datePart = date.toLocaleDateString(currentLang === "en" ? 'en-US' : 'id-ID', options);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const timePart = `${hours}:${minutes} ${ampm}`;
        return `${datePart} ${timePart}`;
    }
}

export { useFormatDate };