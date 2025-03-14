import { ApiUrl } from "./url.constatant"
import { getRequestMethod, postFormData, postRequestMethod } from './api.helper'


export const setProfile = async (data: any) => {
    return await postRequestMethod(ApiUrl.registerDeliveryPartner, data)
}
export const getDBProfile = async (data: any) => {
    return await postRequestMethod(ApiUrl.getDeliveryPartner, data)
}

//status
export const handleToggleSwitch = async (data?: any, config?: any) => {
    return await postRequestMethod(ApiUrl.updateDBStatus, data);
};
export const handleToggleStatus = async (params?: any, config?: any) => {
    const id = params.id;
    console.log(id);
    return await getRequestMethod(ApiUrl.getDBStatus + `?id=${id}`);
};

export const getDocAndActiveHours = async (params?: any, config?: any) => {
    console.log(params,'########');
    
    const id = params.id;
    console.log(id);
    return await getRequestMethod(ApiUrl.getDocAndActiveHours + `?id=${id}`);
};

//OrderApis

export const getOrdersRecived = async (params?: any, config?: any) => {
    return await getRequestMethod(ApiUrl.getOrdersRecived);
};

export const orderUpdateStatus = async (data?: any, config?: any) => {
    console.log(data, 'lio');
    return await postRequestMethod(ApiUrl.orderUpdateStatus, data);
};

export const getAcceptedOrders = async (id?: any, config?: any) => {
    return await getRequestMethod(ApiUrl.getAcceptedOrders + `?id=${id}`);
};

export const Itemstatus = async (data: any) => {
    console.log(data);
    return await postRequestMethod(ApiUrl.updateItemsStatus, data)
}

export const getItemstatus = async (data: any) => {
    return await getRequestMethod(ApiUrl.getItemsStatus)
}

export const getOrderhistory = async (id?: any, config?: any) => {
    return await getRequestMethod(ApiUrl.getOrderhistory + `?id=${id}`);
};

export const SendVerifyOtp = async (data: any) => {
    console.log(data,'dtat');    
    return await postRequestMethod(ApiUrl.sendVerifyOtp, data)
}