module.exports = {
    apps: [
        {
            name: 'get_free_dota',
            script: './get_free.js',
            out_file: './get_free_log.txt',
            error_file: './get_free_error.txt',
            args: "dota"
        },
        {
            name: 'get_free_cs',
            script: './get_free.js',
            out_file: './get_free_log.txt',
            error_file: './get_free_error.txt',
            args: "cs"
        }
    ]
}