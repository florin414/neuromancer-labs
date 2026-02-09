mcp:
	@chmod +x scripts/mcp.sh
	@./scripts/mcp.sh

tree:
	tree -I "node_modules|.git|dist"