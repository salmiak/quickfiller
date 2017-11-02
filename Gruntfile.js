module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // compress: true,
        sourceMap: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'build/contentscript.js' : ['node_modules/zepto/dist/zepto.min.js', 'node_modules/fuzzyset.js/lib/fuzzyset.js', 'src/contentscript.js']
        }
      }
    },
    copy: {
      assets: {
        files: [
          {expand: true, cwd: 'static/', src: ['**'], dest: 'build/', filter: 'isFile'},
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'copy']);

};
