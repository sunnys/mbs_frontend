const getUserList = /* istanbul ignore next - Request and Pure passthrough */ () => {
    return (dispatch, getState, Request) => {
        return Request.fetch("/api/v1/simulation_results")
            .then(response => {
                return response.json().then(data => {
                    return data;
                });
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };
};

const getUserListOfSimulation = /* istanbul ignore next - Request and Pure passthrough */ id => {
    return (dispatch, getState, Request) => {
        return Request.fetch("/api/v1/simulation_results/simulation_index/" + id)
            .then(response => {
                return response.json().then(data => {
                    return data;
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const getUserData = /* istanbul ignore next - Request and Pure passthrough */ id => {
    return (dispatch, getState, Request) => {
        return Request.fetch("/api/v1/simulation_results/" + id + "/simulation_show/" + "1")
            .then(response => {
                return response.json().then(data => {
                    return data;
                });
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };
};

class AnalyticsAction {
    static getUserList = getUserList;
    static getUserData = getUserData;
    static getUserListOfSimulation = getUserListOfSimulation;
}

export default AnalyticsAction;
