module.exports.sendUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
    };
}


module.exports.replaceKeys = (object, eventID) => {
    Object.keys(object).forEach(function (key) {
        // const twoLower = key.toLowerCase();
        const removeSpace = key.replace(/\s+/g, '');
        const newKey = removeSpace.toString().toLowerCase();
        if (object[key] && typeof object[key] === 'object') {
            replaceKeys(object[key]);
        }
        if (key !== newKey) {
            object[newKey] = object[key];
            delete object[key];
        }
    });
    object.event = eventID
    return object;
}