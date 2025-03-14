import * as Api from '../services/api.services'
export const sendOtp = async (status: any, OrderId: any) => {
    try {
        const data = {
            status,
            OrderId: OrderId
        }
        const response = await Api.SendVerifyOtp(data)
        console.log(response, '*************************');


    } catch (error) {
        console.log(error);
    }
};