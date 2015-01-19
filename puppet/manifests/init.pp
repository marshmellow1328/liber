class {'nodejs':
	version	=> 'v0.10.26'
}

package {'grunt-cli':
	ensure		=> '0.1.13',
	provider	=> 'npm',
	require		=> Class['nodejs']
}

package {'json-proxy':
    ensure      => '0.3.0',
    provider    => 'npm',
    require     => Class['nodejs']
}

exec {'npm-install-services':
	command	=> '/usr/local/node/node-default/bin/npm install',
	cwd		=> '/vagrant/services',
	require	=> Class['nodejs']
}

exec {'npm-install-web':
	command	=> '/usr/local/node/node-default/bin/npm install',
	cwd		=> '/vagrant/web',
	require	=> Class['nodejs']
}

include '::mongodb::server'
