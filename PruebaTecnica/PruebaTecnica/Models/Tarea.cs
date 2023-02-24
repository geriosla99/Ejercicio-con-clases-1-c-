using System;
using System.Collections.Generic;

namespace PruebaTecnica.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string? Description { get; set; }

    public DateTime? RegisterDate { get; set; }
}
