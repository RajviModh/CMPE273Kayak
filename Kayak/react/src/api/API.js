const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) => {
    return fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            alert("back in API  : " + JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};
export const doSignup = (payload) => {
    return fetch(`${api}/doSignUp`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

// -----------------------------------------------Admin Add Operations-----------------------------------------------

export const adminAddHotels = (payload) => {
    return fetch(`${api}/adminAddHotels`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminAddFlights = (payload) => {
    return fetch(`${api}/adminAddFlights`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminAddCars = (payload) => {
    return fetch(`${api}/adminAddCars`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

// -----------------------------------------------Admin Search Operations-----------------------------------------------

export const adminSearchHotels = (payload) => {
    return fetch(`${api}/adminSearchHotels`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminSearchFlights = (payload) => {
    return fetch(`${api}/adminSearchFlights`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminSearchCars = (payload) => {
    return fetch(`${api}/adminSearchCars`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};


export const adminSearchBills = (payload) => {
    return fetch(`${api}/adminSearchBils`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

// -----------------------------------------------Admin View Operations-----------------------------------------------

export const adminViewHotels = (payload) => {
    return fetch(`${api}/adminViewHotels`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminViewFlights = (payload) => {
    return fetch(`${api}/adminViewFlights`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminViewCars = (payload) => {
    return fetch(`${api}/adminViewCars`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminViewUsers = (payload) => {
    return fetch(`${api}/adminViewUsers`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

// -----------------------------------------------Admin Update Operations-----------------------------------------------

export const adminUpdateHotels = (payload) => {
    return fetch(`${api}/adminUpdateHotels`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminUpdateFlights = (payload) => {
    return fetch(`${api}/adminUpdateFlights`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            alert(" FLIGHT in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminUpdateCars = (payload) => {
    return fetch(`${api}/adminUpdateCars`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminUpdateUsers = (payload) => {
    return fetch(`${api}/adminUpdateUsers`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

// -----------------------------------------------Admin Delete Operations-----------------------------------------------


export const adminDeleteHotels = (payload) => {
    return fetch(`${api}/adminDeleteHotels`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminDeleteFlights = (payload) => {
    return fetch(`${api}/adminDeleteFlights`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminDeleteCars = (payload) => {
    return fetch(`${api}/adminDeleteCars`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};


// -----------------------------------------------Admin Dashboard Operations-----------------------------------------------

export const adminViewCityByRevenue = (payload) => {
    return fetch(`${api}/adminViewCityByRevenue`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminViewHotelsChart = (payload) => {
    return fetch(`${api}/adminViewHotelsChart`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};

export const adminViewCarsChart = (payload) => {
    return fetch(`${api}/adminViewCarsChart`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    ).then(res => res.json())
        .then(res => {
            //alert("in api response : "+JSON.stringify(res));
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
};