export const fetchUsers = async () => {
    //fetch and store from php api
    try {
        const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php`);
        const resData = await reqData.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch users");
    }
}
export const fetchUser = async (req) => {
    //search mysqli with req as keyword
    try {
        console.log(encodeURIComponent(req));
        const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php/${encodeURIComponent(req)}`);
        const data = await reqData.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch user");
    }
}