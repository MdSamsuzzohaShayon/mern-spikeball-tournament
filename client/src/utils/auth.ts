export function handleRequestUnauthenticated(response: Response){
    if(response.status === 401){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/';
    }
}