export const extractOrderParts = (orderId: string | null | undefined, defaultId = 'Dumy00005') => {
    const id = orderId || defaultId;
    const firstPart = id.slice(0, -4);
    const lastFourDigits = id.slice(-4);
    return { firstPart, lastFourDigits };
};

export const formatTime = (totalSeconds: any) => {
    const time = new Date(totalSeconds)
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    // console.log(seconds, 'seconds');

    return `${hours}:${minutes}`;
    // return time.toString()
};