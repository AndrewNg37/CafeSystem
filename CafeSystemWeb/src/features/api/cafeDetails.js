export function getCafe(id) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi/getCafe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({id: id})
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function postCafe(data) {
    const this_formData = new FormData();
    this_formData.append('name', data.name);
    this_formData.append('description', data.description);
    this_formData.append('location', data.location);
    this_formData.append('logo', data.logo);

    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi', {
                    method: 'POST',
                    headers: {
                        'access-control-allow-origin': '*'
                     },
                    body: this_formData
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function putCafe(data) {
    const this_formData = new FormData();
    this_formData.append('id', data.id);
    this_formData.append('name', data.name);
    this_formData.append('description', data.description);
    this_formData.append('location', data.location);
    this_formData.append('logo', data.logo);

    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi', {
                    method: 'PUT',
                    headers: {
                        'access-control-allow-origin': '*'
                    },
                    body: this_formData
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function updateCafeName(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi/updateCafeName', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({
                        "current_cafe": data.current_cafe,
                        "new_cafe": data.new_cafe
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}