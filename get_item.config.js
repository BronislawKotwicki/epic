module.exports = {
    apps: [
        {
            name: 'get_item_dota',
            script: './get_item.js',
            out_file: './get_item_log.txt',
            error_file: './get_item_error.txt',
            args: "dota"
        },
        {
            name: 'get_item_cs',
            script: './get_item.js',
            out_file: './get_item_log.txt',
            error_file: './get_item_error.txt',
            args: "cs"
        }
    ]
}