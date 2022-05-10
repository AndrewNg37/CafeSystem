export function getCafe(location) {
    var isLocation = location ? `?location=${location}` : '';
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi' + isLocation, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    }
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

export function deleteCafe(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({"id": data.id, "name": data.name})
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
