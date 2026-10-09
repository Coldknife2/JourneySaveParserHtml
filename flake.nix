{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };

        node = pkgs.nodejs;
        pnpm = pkgs.pnpm;

        journey-save-parser = pkgs.stdenv.mkDerivation rec {
          pname = "journey-save-parser";
          version = "latest";
          src = pkgs.lib.fileset.toSource rec {
            root = ./.;
            fileset = pkgs.lib.fileset.unions [
              (root + /nuxt.config.ts)
              (root + /env.d.ts)
              (root + /package.json)
              (root + /pnpm-lock.yaml)
              (root + /tsconfig.json)
              (root + /app)
              (root + /public)
            ];
          };

          nativeBuildInputs = [
            node
            pkgs.pnpmConfigHook
            pnpm
          ];

          pnpmDeps = pkgs.fetchPnpmDeps {
            inherit pname version src;
            fetcherVersion = 4;
            hash = "sha256-k85VFOs2Xb02xUHwG14SACRQdynkWJ8PLUCCoO2un8o=";
          };

          buildPhase = ''
            pnpm generate
          '';
          installPhase = ''
            mkdir -p $out
            cp -r .output/public $out/public
          '';
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            node
            pnpm
          ];
        };

        packages.default = pkgs.dockerTools.buildImage rec {
          name = "journey-save-parser";
          tag = "latest";
          created = "now";
          copyToRoot = pkgs.buildEnv {
            inherit name;
            paths = [pkgs.static-web-server journey-save-parser];
          };
          config.Cmd = ["static-web-server" "--root" "${journey-save-parser}/public"];
        };
      }
    );
}
