module.exports = {
    apps: [
        {
            name: 'open_box_dota',
            script: './open_box.js',
            out_file: './open_box_log.txt',
            error_file: './open_box_error.txt',
            args: "dota 1000"
        },
        {
            name: 'open_box_cs',
            script: './open_box.js',
            out_file: './open_box_log.txt',
            error_file: './open_box_error.txt',
            args: "cs 1000"
        }
    ]
}