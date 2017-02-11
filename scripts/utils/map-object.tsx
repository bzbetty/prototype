export default function mapObject(object, callback) {
    var idx = 0;
    return Object.keys(object).map(function (key) {
        return callback(object[key], idx++);
    });
}