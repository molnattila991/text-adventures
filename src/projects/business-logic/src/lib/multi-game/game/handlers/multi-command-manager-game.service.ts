import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandManager, CommandOutputWrite } from '@text-adventures/shared';
import { first } from 'rxjs/operators';
import { SelectedRoomVotesService } from '../../room/selected-room-votes.service';

@Injectable()
export class MultiCommandManagerGameService implements CommandManager {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    private selectedRoomVotesService: SelectedRoomVotesService

  ) { }
  handle(commandParts: string[]): void {
    if (commandParts[1]) {
      switch (commandParts[1]) {
        case "vote":
          const result = confirm("Biztos vagy benne?");
          result && this.selectedRoomVotesService.vote();
          this.output.pushText(["Szavaztál, várd meg amíg minden játékos leadja a jelzését."]);
          break;
        case "state":
          this.selectedRoomVotesService.getStatus()
            .pipe(first())
            .subscribe(item => {
              this.output.pushText(["Aktuális státus: " + item.votes + "/" + item.activeMembersNumber + " (szavazat/aktív játékosok száma)."]);
            })
          break;
      }
    } else {
      this.output.pushHelp("game");
    }
  }
}
