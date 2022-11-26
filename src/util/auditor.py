class AuditCode:
    def input_audit():
        code = "import sys\n"
        code += "def input_audit(event, args):\n"
        code += "\tif event == 'builtins.input':\n"
        code += "\t\traise RuntimeError(f'audit: {event} with args={args}')\n"
        code += "sys.addaudithook(input_audit)\n\n"
        return code