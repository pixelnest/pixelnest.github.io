# Forked from: https://github.com/octopress/autoprefixer/blob/master/lib/octopress-autoprefixer.rb
require 'autoprefixer-rails'
require 'find'

module AutoPrefixer

  Jekyll::Hooks.register :site, :post_write, priority: :low do |site|
    AutoPrefixer.process(site)
  end

  def self.find_stylesheets(dir)
    return [] unless Dir.exist? dir
    Find.find(dir).to_a.reject { |f| File.extname(f) != '.css' }
  end

  def self.process(site)
    # Get config.
    config = site.config['autoprefixer'] || {}
    target_dir = config['dir'] || ''

    find_stylesheets(site.config['destination'] + target_dir).each do |file|
      prefix(file)
    end
  end

  def self.prefix(stylesheet)
    content = File.open(stylesheet).read
    File.open(stylesheet, 'w') do |f|
      f.write(AutoprefixerRails.process(content))
    end
  end
  
end
