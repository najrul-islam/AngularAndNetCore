using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.ViewModels
{
    public class TaskVm
    {
        public string TaskGuid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime TaskDate { get; set; }
        public DateTime TaskFromTime { get; set; }
        public DateTime TaskToTime { get; set; }
        public string Location { get; set; }
    }
}
