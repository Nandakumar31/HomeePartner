export const TruncatedText = ( {text} :any) => {
    console.log(text,'hr');    
    return text?.length > 70 ? text.substring(0, 70) + '...' : text;
    
}