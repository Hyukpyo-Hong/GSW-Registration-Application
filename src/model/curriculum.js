exports.getCurriculum = (conn, year, level, major) => {
    var module = null;

    //Current version assume year parameter as 2016-2017.
    if (level === 'Undergraduate' && major === "ComputerScience") {
        module = require('./under_computerscience')
    } else if (level === 'Graduate' && major === "ComputerScience") {
        module = require('./grad_computerscience')
    }

    return module.getCurriculum(conn);
}
