{
  description = "Vite + React Dev Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";

    nix-vscode-extensions = {
      url = "github:nix-community/nix-vscode-extensions";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    nix-vscode-extensions,
    ...
  } @ inputs: {
    devShells.x86_64-linux.default = let
      system = "x86_64-linux";
      pkgs = import nixpkgs {inherit system;};
      extensions =
        (with inputs.nix-vscode-extensions.extensions.${pkgs.stdenv.hostPlatform.system}.vscode-marketplace; [
          yoavbls.pretty-ts-errors
        ])
        ++ (with inputs.nix-vscode-extensions.extensions.${pkgs.stdenv.hostPlatform.system}.open-vsx; [
          antfu.vite
          oxc.oxc-vscode
          vitest.explorer
        ]);
    in
      pkgs.mkShell {
        packages = with pkgs; [
          alejandra
          statix
          deadnix
          nil

          nodejs
          typescript
          vite

          (vscode-with-extensions.override {
            vscode = pkgs.vscodium;
            vscodeExtensions = extensions;
          })
        ];

        shellHook = ''
          if [ ! -d "node_modules" ]; then
            npm install
          fi
        '';
      };
  };
}
