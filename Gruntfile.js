module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: [
          {
            src: [
              'client/assets/js/src/templates.js',
              'client/assets/js/src/*.js'
            ],
            dest: 'client/assets/js/goGive.js'
          }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> | <%= pkg.version %> | <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          'client/assets/js/goGive.min.js': ['<%= concat.dist.files[0].dest %>']
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    watch: {
      files: [
        'client/assets/js/src/**/*',
        'client/assets/sass/**/*',
        'client/assets/components/**/*'
      ],
      tasks: ['default']
    },
    html2js: {
        options: {
          base: 'client'
        },
        main: {
          src: ['client/components/**/*.html'],
          dest: 'client/assets/js/src/templates.js'
        },
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['html2js', 'concat', 'compass', 'uglify']);

};