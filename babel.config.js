const dotenv = require('dotenv');

dotenv.config();

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'transform-inline-environment-variables',
        {
          include: ['EXPO_PUBLIC_ETH_RPC_URL', 'ETH_RPC_URL'],
        },
      ],
    ],
  };
};
