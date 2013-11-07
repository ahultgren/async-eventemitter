'use strict';

module.exports = function(grunt) {
  var files = ['Gruntfile.js', 'package.json', 'index.js', 'lib/*.js', 'test/*.js'];

  grunt.initConfig({
    jshint: {
      // Pre-test
      sloppy: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          globalstrict: true,
          node: true,
          camelcase: true,
          newcap: true,
          proto: true
        },
        files: {
          src: files
        }
      },
      // Post-test
      strict: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          globalstrict: true,
          node: true,
          camelcase: true,
          indent: 2,
          immed: true,
          latedef: 'nofunc',
          newcap: true,
          quotmark: true,
          undef: true,
          unused: true,
          trailing: true
        },
        files: {
          src: files
        }
      }
    },
    watch: {
      files: ['<%= jshint.files.src %>'],
      tasks: ['default']
    }
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'watch']);
};
